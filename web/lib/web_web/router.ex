defmodule WebWeb.Router do
  use WebWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {WebWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", WebWeb do
    pipe_through :browser

    #get "/", PageController, :home
    get "/", PageController, :index #Copiar esta
    get "/contacto", PageController, :contacto #Copiar esta
    get "/cursos", PageController, :cursos #Copiar esta
    get "/quienes_somos", PageController, :quienes_somos #Copiar esta
    get "/tests", TetController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", WebWeb do
  #   pipe_through :api
  # end
end
