// In a real app, these would be actual fetch calls to your backend.
// To make this runnable, we're simulating the API.
export const mockApi = async (path, options = {}) => {
  console.log(`Mock API Call: ${options.method || 'GET'} ${path}`, options.body ? JSON.parse(options.body) : '');
  await new Promise(res => setTimeout(res, 800 + Math.random() * 1000)); // Simulate network delay

  const { method = 'GET' } = options;
  const body = options.body ? JSON.parse(options.body) : {};

  if (path.startsWith('/api/auth/login')) {
    if (body.email === 'hunter@septer.io' && body.password === 'Password123!') {
      return {
        ok: true,
        json: () => Promise.resolve({
          access_token: 'mock-jwt-hunter-token',
          User: { id: 'user-1', email: 'hunter@septer.io', role: 'Hunter' }
        })
      };
    }
  }

  if (path.startsWith('/api/g-login-rntinfosec')) {
     if (body.email === 'puja@rntinfosec.in' && body.password === 'Asdf2580@') {
       return {
         ok: true,
         json: () => Promise.resolve({
           access_token: 'mock-jwt-guardian-token',
           User: { id: 'admin', email: 'puja@rntinfosec.in', role: 'Guardian' }
         })
       };
     }
  }
  
  if (path.startsWith('/api/hunter/signup')) {
    if (body.email && body.password) {
      return { ok: true, json: () => Promise.resolve({ Message: "Email Registered!" }) };
    }
  }

  if (path.startsWith('/api/hunter/add-api-key')) {
      return { ok: true, json: () => Promise.resolve({ Message: "Key Added!", User: { id: 'user-1', email: 'hunter@septer.io', role: 'Hunter', gemini_api_key: body.api_key } }) };
  }
  
  if (path.startsWith('/api/logs/upload')) {
    return { ok: true, json: () => Promise.resolve({ message: "Log uploaded", log_id: `log-${Date.now()}` }) };
  }

  if (path.startsWith('/api/logs/ask')) {
    await new Promise(res => setTimeout(res, 7000)); // Longer delay for AI processing
    return {
      ok: true,
      json: () => Promise.resolve({
        insights: "Critical vulnerability detected: SQL Injection point in `user_login` endpoint. The user input for 'username' is directly concatenated into a database query.",
        reasoning: "The log entry at timestamp `1678886400` shows a query `SELECT * FROM users WHERE username = 'admin' OR '1'='1'` which indicates a classic SQL injection pattern. The AI core correlated this pattern with known CWE-89 vulnerabilities.",
        supporting_logs: "Log Timestamp: 1678886400, Level: ERROR, Message: 'SQL syntax error near ''1'='1''', Request: /login, Payload: {username: \"admin' OR '1'='1'\"}",
        fixes: "Implement parameterized queries or use an ORM to handle database interactions. Never concatenate user input directly into SQL statements. Example fix in Python with `psycopg2`: `cursor.execute(\"SELECT * FROM users WHERE username = %s\", (username,))`"
      })
    };
  }

  if (path.startsWith('/api/guardian/dashboard')) {
      return {
          ok: true,
          json: () => Promise.resolve({
              total_users: 15,
              hunters: 14,
              guardians: 1,
              users: [
                  { email: 'hunter@septer.io', password: 'decrypted_password_1', gemini_api_key: 'gmn_key_mock_123', questions_asked: 12 },
                  { email: 'user2@example.com', password: 'decrypted_password_2', gemini_api_key: null, questions_asked: 0 },
                  { email: 'user3@example.com', password: 'decrypted_password_3', gemini_api_key: 'gmn_key_mock_456', questions_asked: 5 },
              ]
          })
      };
  }

  return { ok: false, status: 404, json: () => Promise.resolve({ detail: "Not Found" }) };
};