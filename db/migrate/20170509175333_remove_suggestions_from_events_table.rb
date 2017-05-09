class RemoveSuggestionsFromEventsTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :events, :suggested_date, :string
    remove_column :events, :suggested_time, :string
    remove_column :events, :suggested_location, :string
  end
end
