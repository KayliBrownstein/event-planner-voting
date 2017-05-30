class RemoveTokenFromInvites < ActiveRecord::Migration[5.0]
  def change
    remove_column :invites, :token, :string
  end
end
