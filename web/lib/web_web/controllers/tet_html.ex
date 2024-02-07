defmodule WebWeb.TetHTML do
  use WebWeb, :html

  embed_templates "tet_html/*"

  @doc """
  Renders a tet form.
  """
  attr :changeset, Ecto.Changeset, required: true
  attr :action, :string, required: true

  def tet_form(assigns)
end
