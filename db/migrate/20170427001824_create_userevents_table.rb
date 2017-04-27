class CreateUsereventsTable < ActiveRecord::Migration
  def change
    create_table :userevents do |t|
      t.belongs_to :user
      t.belongs_to :event

      t.timestamps
    end
  end
end
