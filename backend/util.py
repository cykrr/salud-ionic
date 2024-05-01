from datetime import datetime

def validate_date(str):
    try:
        datetime.strptime(str, '%Y-%m-%d')
        return True
    except ValueError:
        return False
