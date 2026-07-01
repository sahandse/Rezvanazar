import type { ActivityLog, Student } from "../types";

interface AdminPanelProps {
  students: Student[];
  activityLog: ActivityLog;
  onLogout: () => void;
}

export default function AdminPanel({ students, activityLog, onLogout }: AdminPanelProps) {
  const entries = Object.values(activityLog);
  const completedCount = entries.length;
  const avgScore = entries.length
    ? (entries.reduce((sum, e) => sum + e.score, 0) / entries.length).toFixed(1)
    : "—";

  return (
    <div className="admin">
      <div className="admin__header">
        <h2>پنل مدیر — نمرات و فعالیت دانش‌آموزان</h2>
        <button className="btn btn--ghost" onClick={onLogout}>
          خروج از پنل
        </button>
      </div>

      <div className="admin__stats">
        <div className="admin__stat">
          <span className="admin__stat-value">
            {completedCount} از {students.length}
          </span>
          <span className="admin__stat-label">تکلیف را انجام داده‌اند</span>
        </div>
        <div className="admin__stat">
          <span className="admin__stat-value">{avgScore}</span>
          <span className="admin__stat-label">میانگین نمره (از ۵)</span>
        </div>
      </div>

      <div className="admin__table-wrap">
        <table className="admin__table">
          <thead>
            <tr>
              <th>صندلی</th>
              <th>نام</th>
              <th>نام‌کاربری</th>
              <th>وضعیت</th>
              <th>نمره</th>
              <th>زمان انجام</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const entry = activityLog[student.seat];
              return (
                <tr key={student.id}>
                  <td>{student.seat}</td>
                  <td>{student.name}</td>
                  <td>{student.username}</td>
                  <td>
                    {entry ? (
                      <span className="admin__badge admin__badge--done">انجام شده</span>
                    ) : (
                      <span className="admin__badge admin__badge--pending">انجام نشده</span>
                    )}
                  </td>
                  <td>{entry ? `${entry.score} از ${entry.total}` : "—"}</td>
                  <td>{entry ? new Date(entry.completedAt).toLocaleString("fa-IR") : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
