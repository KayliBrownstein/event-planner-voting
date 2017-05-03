class CreateLocationsTable < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :street_address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.text :description, null: false
      t.integer :votes, default: 0

      t.belongs_to :user
      t.belongs_to :event

      t.timestamps
    end
  end
end
