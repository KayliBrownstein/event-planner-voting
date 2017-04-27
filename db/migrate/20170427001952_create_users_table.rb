class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.boolean :admin, default: false
      t.string :avatar
      t.string :email, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :password_digest
      t.string :password_reset_digest
      t.datetime :password_reset_sent_at
      t.string :remember_digest
      t.string :universally_unique_id, null: false
    end
  end
end
