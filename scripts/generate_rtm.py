from pathlib import Path

FILES = [
    "docs/docs/activity for wedding management system/auth/ucs-auth.md",
    "docs/docs/activity for wedding management system/manage-users/ucs-manage-users.md",
    "docs/docs/activity for wedding management system/manage-permissions/ucs-manage-permissions.md",
    "docs/docs/activity for wedding management system/manage-halls/ucs-manage-halls.md",
    "docs/docs/activity for wedding management system/manage-hall-types/ucs-manage-hall-types.md",
    "docs/docs/activity for wedding management system/manage-services/ucs-manage-services.md",
    "docs/docs/activity for wedding management system/manage-menu/ucs-manage-menu.md",
    "docs/docs/activity for wedding management system/manage-shifts/ucs-manage-shifts.md",
    "docs/docs/activity for wedding management system/customer-bookings/ucs-customer-bookings.md",
    "docs/docs/activity for wedding management system/manage-bookings/ucs-manage-bookings.md",
    "docs/docs/activity for wedding management system/customer-payment/ucs-customer-payment.md",
    "docs/docs/activity for wedding management system/manage-invoices/ucs-manage-invoices.md",
    "docs/docs/activity for wedding management system/reporting/ucs-reporting.md",
    "docs/docs/activity for wedding management system/system-settings/ucs-system-settings.md",
]

CATEGORY_TEMPLATES = {
    "login": [
        ("Happy path", "Login with valid credentials returns both access and refresh tokens."),
        ("Missing fields", "Submit empty username/password and verify validation errors."),
        ("Wrong password", "Use valid username but wrong password and confirm generic error."),
        ("Locked account", "Attempt login on locked account and expect lockout message."),
        ("Service failure", "Simulate auth service outage and ensure graceful error handling."),
    ],
    "logout": [
        ("Happy path", "Logout from active session and ensure tokens are blacklisted."),
        ("Cancel", "Cancel logout confirmation keeps session active."),
        ("Missing refresh token", "Logout without refresh token still clears access token."),
        ("Unauthorized", "Call logout API without Authorization header and expect 401."),
        ("Persistence failure", "Simulate blacklist store failure and verify client forced to clear tokens."),
    ],
    "profile": [
        ("Happy path", "Update personal information with valid data and verify persistence."),
        ("Invalid email", "Enter malformed email and expect inline validation error."),
        ("Duplicate email", "Use email already taken by another user and expect rejection."),
        ("Unauthorized role", "Attempt profile edit without valid JWT and expect 401."),
        ("Concurrent update", "Ensure optimistic locking prevents overriding newer data."),
    ],
    "change_password": [
        ("Happy path", "Change password with correct current password and matching confirmation."),
        ("Wrong current", "Provide wrong current password and ensure change is blocked."),
        ("Weak password", "Enter password shorter than policy to trigger validation error."),
        ("Reuse password", "Attempt to reuse previous password and expect rejection."),
        ("Token cleanup", "Verify all refresh tokens are revoked after password change."),
    ],
    "register": [
        ("Happy path", "Register new account with unique username/email."),
        ("Missing required", "Omit mandatory fields and ensure inline validation."),
        ("Duplicate username", "Register with existing username and expect duplication error."),
        ("Duplicate email", "Register with email already in system and expect rejection."),
        ("Rollback failure", "Simulate DB failure mid-transaction and verify rollback."),
    ],
    "forgot_password": [
        ("Happy path", "Request reset link and complete password reset using valid token."),
        ("Unknown email", "Submit email not in system and ensure generic success message."),
        ("Invalid token", "Use tampered token and expect invalid/expired response."),
        ("Expired token", "Try resetting after expiry threshold and expect denial."),
        ("Rate limit", "Trigger throttling by requesting resets repeatedly."),
    ],
    "view": [
        ("Default list", "Load {title} without filters shows paginated data."),
        ("Filter search", "Apply combined filters and verify results match criteria."),
        ("Empty state", "Search with no matches and ensure friendly empty-state message."),
        ("Unauthorized", "Access {title} with insufficient role and expect 403."),
        ("Pagination edge", "Navigate to last page where remaining records < page size."),
    ],
    "create": [
        ("Happy path", "Complete {title} with valid unique data and verify persistence."),
        ("Missing required", "Omit mandatory fields and ensure validation blocks save."),
        ("Duplicate detection", "Attempt {title} with data that violates uniqueness."),
        ("Business rule", "Provide values outside allowed range and expect rejection."),
        ("Rollback", "Simulate DB failure to ensure transaction rolls back."),
    ],
    "edit": [
        ("Happy path", "Update existing record via {title} and verify persisted changes."),
        ("Validation", "Enter invalid data (e.g., negative numbers) and expect inline errors."),
        ("Duplicate", "Change key field to value already used elsewhere and ensure rejection."),
        ("Concurrent", "Handle simultaneous edits by detecting stale version."),
        ("Unauthorized", "Attempt {title} without required role and expect 403."),
    ],
    "delete": [
        ("Happy path", "Delete target entity via {title} when no dependencies exist."),
        ("Has dependencies", "Prevent deletion when related records exist and show message."),
        ("Cancel", "Select delete but cancel confirmation leaves record intact."),
        ("Unauthorized", "Attempt {title} without permission and expect 403."),
        ("DB failure", "Simulate deletion failure and ensure error message displayed."),
    ],
    "export": [
        ("Happy path", "Export {title} to file and verify schema/format."),
        ("Filtered export", "Export with active filters and ensure dataset respects criteria."),
        ("Large dataset", "Export >10k rows and ensure streaming/timeout handling."),
        ("Unauthorized", "Attempt export without proper role and expect 403."),
        ("Corrupt template", "Handle template/IO failure gracefully with error."),
    ],
    "payment": [
        ("Happy path", "Complete payment for {title} with valid method and amounts."),
        ("Insufficient funds", "Simulate payment method rejection and ensure invoice stays unpaid."),
        ("Penalty calc", "Verify penalty calculation when paying after due date."),
        ("Duplicate payment", "Prevent double submission of same payment request."),
        ("Gateway failure", "Handle payment gateway timeout with retry prompt."),
    ],
    "system_settings": [
        ("Happy path", "Update parameters within allowed ranges and persist values."),
        ("Range validation", "Enter penalty/deposit ratios outside 0-1 and expect errors."),
        ("Permission", "Block non-admin attempting to change parameters."),
        ("Transaction rollback", "Simulate failure updating one parameter and ensure none persist."),
        ("Audit trail", "Verify update recorded in audit log with user and timestamp."),
    ],
    "default": [
        ("Happy path", "Execute {title} primary flow successfully."),
        ("Validation", "Trigger validation errors by providing invalid input."),
        ("Unauthorized", "Ensure proper authorization is enforced for {title}."),
        ("Edge case", "Exercise boundary conditions relevant to {title}."),
        ("Failure handling", "Simulate downstream failure and verify graceful handling."),
    ],
}

CREATE_KEYWORDS = ("add", "create", "register", "submit", "generate", "assign")
EDIT_KEYWORDS = ("edit", "update", "modify", "change", "adjust", "manage profile")
DELETE_KEYWORDS = ("delete", "remove", "cancel")
EXPORT_KEYWORDS = ("export", "download")
VIEW_KEYWORDS = ("view", "check", "search", "list", "monitor")


def collect_usecases():
    cases = []
    for file in FILES:
        text = Path(file).read_text(encoding="utf-8")
        for line in text.splitlines():
            if not line.startswith("## "):
                continue
            header = line[3:].strip()
            if not header.upper().startswith("UC"):
                continue
            if ":" not in header:
                continue
            uc_id, title = header.split(":", 1)
            uc_id = uc_id.strip()
            title = title.strip()
            if not uc_id:
                continue
            cases.append({"id": uc_id, "title": title})
    return cases


def categorize(title: str) -> str:
    t = title.lower()
    if "login" in t:
        return "login"
    if "logout" in t:
        return "logout"
    if "forgot password" in t:
        return "forgot_password"
    if "change password" in t:
        return "change_password"
    if "register" in t and "account" in t:
        return "register"
    if "profile" in t:
        return "profile"
    if "system" in t and "parameter" in t:
        return "system_settings"
    if any(k in t for k in EXPORT_KEYWORDS):
        return "export"
    if any(k in t for k in DELETE_KEYWORDS):
        return "delete"
    if any(k in t for k in EDIT_KEYWORDS):
        if "password" in t:
            return "change_password"
        return "edit"
    if any(k in t for k in CREATE_KEYWORDS):
        if "payment" in t or "invoice" in t:
            return "payment"
        return "create"
    if any(k in t for k in VIEW_KEYWORDS):
        if "payment" in t or "invoice" in t:
            return "payment"
        return "view"
    if "payment" in t or "invoice" in t:
        return "payment"
    return "default"


def build_rows(cases):
    rows = []
    for uc in cases:
        category = categorize(uc["title"])
        templates = CATEGORY_TEMPLATES.get(category, CATEGORY_TEMPLATES["default"])
        for idx, (label, desc) in enumerate(templates, start=1):
            tc_id = f"TC-{uc['id']}-{idx:02d}"
            detail = desc.format(title=uc["title"])
            rows.append((uc["id"], uc["title"], tc_id, f"{label} – {detail}"))
    return rows


def render_table(rows):
    lines = ["| Req No | Req Description | Test Case ID | Status |\n",
             "| --- | --- | --- | --- |\n"]
    for req_id, title, tc_id, detail in rows:
        lines.append(f"| {req_id} | {title} | `{tc_id}` {detail} | Planned |\n")
    return "".join(lines)


def main():
    cases = collect_usecases()
    rows = build_rows(cases)
    table = render_table(rows)
    output = Path("docs/docs/activity for wedding management system/testing-documents/requirement-traceablity-matrix.md")
    output.write_text(table, encoding="utf-8")
    print(f"Generated {len(rows)} test cases covering {len(cases)} use cases.")


if __name__ == "__main__":
    main()
