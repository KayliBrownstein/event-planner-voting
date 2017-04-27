class CreateDatetimesTable < ActiveRecord::Migration
  def change
    create_table :datetimes do |t|
      t.string :date, null: false
      t.string :time, null: false
      t.belongs_to :user
      t.belongs_to :event

      t.timestamps
    end
  end
end
