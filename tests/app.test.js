const request = require("supertest");
const app = require("../app");

describe("Task API", () => {
  test("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("POST /api/tasks creates a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Learn CI" });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Learn CI");
  });

  test("POST /api/tasks rejects empty title", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "" });
    expect(res.statusCode).toBe(400);
  });

  test("GET /api/tasks returns a list", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("DELETE /api/tasks/:id removes a task", async () => {
    const created = await request(app)
      .post("/api/tasks")
      .send({ title: "Temp task" });
    const res = await request(app).delete("/api/tasks/" + created.body.id);
    expect(res.statusCode).toBe(204);
  });
});