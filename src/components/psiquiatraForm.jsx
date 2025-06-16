import { useState } from "react";
import api from "../services/api";
import "./PSIQUIATRAForm.css";

export default function PSIQUIATRAForm() {
  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    email: "",
    fone: "",
    password: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado como ADMIN para cadastrar psiquiatras.");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await api.post("/psiquiatras", form, config);
      alert("Psiquiatra cadastrado com sucesso!");
      setForm({ nome: "", especialidade: "", email: "", fone: "", password: "" });
    } catch (err) {
      const serverMsg =
        err.response?.data && typeof err.response.data !== "string"
          ? JSON.stringify(err.response.data, null, 2)
          : err.response?.data || err.message;
      alert("Falha ao cadastrar:\n" + serverMsg);
    }
  };

  return (
    <div className="doctor-page-background">
      <header className="appointment-header-container">
        <div className="logo-title">
          <h1 className="site-title">Clínica Psiquiatra</h1>
        </div>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className="bar top-bar" />
          <span className="bar mid-bar" />
          <span className="bar bot-bar" />
        </button>
        <nav className={`nav-menu ${menuOpen ? "show" : ""}`}>
          <ul>
            <li><a href="/Home" onClick={() => setMenuOpen(false)}>Início</a></li>
            <li><a href="/PSIQUIATRAs" onClick={() => setMenuOpen(false)}>PSIQUIATRAs</a></li>
            <li><a href="/pacientes" onClick={() => setMenuOpen(false)}>Pacientes</a></li>
            <li><a href="/consultas" onClick={() => setMenuOpen(false)}>Consultas</a></li>
            <li><a href="/reports" onClick={() => setMenuOpen(false)}>Relatórios</a></li>
          </ul>
        </nav>
      </header>

      <div className="doctor-card animate-card">
        <div className="doctor-header animate-header">
          <svg
            className="doctor-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="currentColor"
          >
            <path d="M32 2C18.745 2 8 12.745 8 26c0 10.905 7.137 20.105 17 23.338V62h10V49.338C48.863 46.105 56 36.905 56 26 56 12.745 45.255 2 32 2zM32 6c12.15 0 22 9.85 22 22 0 9.065-5.161 17.04-12.75 20.967L41 50H23l-.25-1.033C17.161 45.04 12 37.065 12 28 12 15.85 21.85 6 32 6zm-6 14h12v4H26zm0 8h12v4H26z" />
          </svg>
          <h2 className="doctor-title">Cadastro de Psiquiatra</h2>
        </div>

        <form className="doctor-form" onSubmit={handleSubmit}>
          <div className="input-group animate-input" style={{ animationDelay: "0.2s" }}>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Digite o nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group animate-input" style={{ animationDelay: "0.4s" }}>
            <label htmlFor="especialidade">Especialidade</label>
            <input
              id="especialidade"
              name="especialidade"
              type="text"
              placeholder="Ex: Psiquiatra Facial"
              value={form.especialidade}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group animate-input" style={{ animationDelay: "0.6s" }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="exemplo@dominio.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group animate-input" style={{ animationDelay: "0.8s" }}>
            <label htmlFor="fone">Telefone</label>
            <input
              id="fone"
              name="fone"
              type="tel"
              placeholder="(XX) XXXXX-XXXX"
              value={form.fone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group animate-input" style={{ animationDelay: "1s" }}>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Digite uma senha"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-submit animate-button">
            Cadastrar Psiquiatra
          </button>
        </form>
      </div>
    </div>
);
}
