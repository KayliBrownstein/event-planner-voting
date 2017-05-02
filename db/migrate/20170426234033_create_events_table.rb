class CreateEventsTable < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :cutoff_time, null: false
      t.string :suggested_date, null: false
      t.string :suggested_time, null: false
      t.string :suggested_location, null: false
      t.belongs_to :user

      t.timestamps
    end
  end
end
