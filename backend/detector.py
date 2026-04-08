def detect_threats(logs):
    suspicious = []
    login_attempts = {}

    for log in logs:
        if log.action == "failed_login":
            login_attempts[log.user] = login_attempts.get(log.user, 0) + 1

        if login_attempts.get(log.user, 0) > 3:
            suspicious.append({
                "user": log.user,
                "reason": "Multiple failed logins"
            })

    return suspicious