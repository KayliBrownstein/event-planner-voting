class RemoveVotesColumnFromLocations < ActiveRecord::Migration[5.0]
  def up
    remove_column :locations, :votes
  end

  def down
    add_column :locations, :votes, :integer, default: 0
  end
end
