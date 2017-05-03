class CreateLocationVotesTable < ActiveRecord::Migration[5.0]
  def change
    create_table :location_votes do |t|
      t.belongs_to :location
      t.boolean :upvote, default: false
      t.boolean :downvote, default: false
      t.belongs_to :user

      t.timestamps
    end
  end
end
