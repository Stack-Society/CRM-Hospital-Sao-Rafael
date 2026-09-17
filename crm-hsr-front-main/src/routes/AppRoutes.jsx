import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import RoleRoute from "./RoleRoute";
import Home from "../pages/callcenter/Home"
import Leads from "../pages/callcenter/Leads";
import Agenda from "../pages/callcenter/Agenda";
import NovoAgendamento from "../pages/callcenter/NovoAgendamento";
import AgendamentoDetalhes from "../pages/callcenter/AgendamentoDetalhes";
import AgendaDetalhes from "../pages/callcenter/AgendaDetalhes";
import Historico from "../pages/callcenter/Historico";
import Cadastro from "../pages/callcenter/Cadastro";
import NovoCadastro from "../pages/callcenter/NovoCadastro";
import LeadsDetalhes from "../pages/callcenter/LeadsDetalhes"
import { Navigate } from "react-router-dom";
import CadastroFuncionario from "../pages/admin/CadastroFuncionario";
import Unauthorized from "../pages/Unauthorized";
import Recepcao from "../pages/Recepcao";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin/cadastroFuncionario"
          element={
            <RoleRoute allowedRoles={["ADMIN"]}>
              <CadastroFuncionario/>
            </RoleRoute>
          }
        />

        <Route
          path="/callcenter/home"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <Home />
            </RoleRoute>
          }
        />

        <Route
          path="/callcenter/leads"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <Leads />
            </RoleRoute>
          }
        />

        <Route path="/callcenter/leads/:id" element={
          <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
            <LeadsDetalhes />
          </RoleRoute>
        }
        />

        <Route
          path="/callcenter/agenda"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <Agenda />
            </RoleRoute>
          }
        />

        <Route
          path="/callcenter/agenda/detalhes"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <AgendaDetalhes />
            </RoleRoute>
          }
        />

        <Route
          path="/callcenter/agenda/detalhes/:id"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <AgendamentoDetalhes />
            </RoleRoute>
          }
        />

        <Route
          path="/callcenter/agenda/novo-agendamento"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <NovoAgendamento />
            </RoleRoute>
          }
        />
{/* 
        <Route
          path="/callcenter/confirmacoes"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <Confirmacoes />
            </RoleRoute>
          }
        /> */}

        <Route
          path="/callcenter/historico"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <Historico />
            </RoleRoute>
          }
        />

        <Route
          path="/callcenter/cadastro"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <Cadastro />
            </RoleRoute>
          }
        />

        <Route
          path="/callcenter/cadastro/novo"
          element={
            <RoleRoute allowedRoles={["CALL_CENTER", "ADMIN"]}>
              <NovoCadastro />
            </RoleRoute>
          }
        />

        <Route
          path="/recepcao"
          element={
            <RoleRoute allowedRoles={["RECEPCAO"]}>
              <Recepcao />
            </RoleRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
