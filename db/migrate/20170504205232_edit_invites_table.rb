class EditInvitesTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :invites, :event_id
    add_column :invites, :event_id, :integer, null: false
  end
end
