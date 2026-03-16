# API Endpoints (Backend-Ready)

This project now exposes versioned integration endpoints under:

- `/api/v1/*`

All endpoints return a consistent envelope:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error envelope:

```json
{
  "success": false,
  "error": {
    "message": "..."
  }
}
```

## Health

- `GET /api/v1/health`

## Dashboard

- `GET /api/v1/dashboard/summary?period=Weekly`
  - Supported `period`: `Daily | Weekly | Monthly | Yearly`

## Appointments

- `GET /api/v1/appointments`
- `GET /api/v1/appointments?status=Online`
- `GET /api/v1/appointments?date=Jun%2024,%202022`
- `POST /api/v1/appointments`
  - Body: `time, patient, reason, status, date`

## Patients

- `GET /api/v1/patients`
- `GET /api/v1/patients?q=ramya`
- `GET /api/v1/patients?status=Active`

## Notifications

- `GET /api/v1/notifications?section=updates&filter=subscribed`
- `GET /api/v1/notifications?section=updates&filter=regular`
- `GET /api/v1/notifications?section=appointments&filter=all`
- `GET /api/v1/notifications?section=emergency&filter=scheduled`

## Profile

- `GET /api/v1/profile`
- `PUT /api/v1/profile`
  - Partial update supported

## Calendar Availability

- `GET /api/v1/calendar/availability`
- `PUT /api/v1/calendar/availability`
  - Partial update supported

## Invite

- `POST /api/v1/invite`
  - Body: `name, email, role, department, message?`

## Integration Notes

- Current handlers are mock/in-memory and mirror backend contracts.
- Replace in-memory store logic in `lib/api-store.ts` with DB/service calls when backend is connected.
- Frontend can migrate incrementally by swapping local mock reads with `fetch('/api/v1/...')` calls.
