defmodule WebWeb.PageController do
  use WebWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :home, layout: false)
  end

  #Copia esta función
  def index(conn, _params) do
    render(conn, :index, layout: false)
  end
  def contacto(conn, _params) do
    render(conn, :contacto, layout: false)
  end
  def cursos(conn, _params) do
    render(conn, :cursos, layout: false)
  end
  def quienes_somos(conn, _params) do
    render(conn, :quienes_somos, layout: false)
  end
end
