defmodule Web.TestsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Web.Tests` context.
  """

  @doc """
  Generate a tet.
  """
  def tet_fixture(attrs \\ %{}) do
    {:ok, tet} =
      attrs
      |> Enum.into(%{

      })
      |> Web.Tests.create_tet()

    tet
  end
end
