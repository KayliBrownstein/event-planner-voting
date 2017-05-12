class Location < ApplicationRecord
  validates :name, presence: true
  validates :street_address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :description, presence: true

  belongs_to :user
  belongs_to :event
  has_many :location_votes

  def upvotes
    location_votes.where(upvote: true).length
  end

  def downvotes
    location_votes.where(downvote: true).length
  end

  def vote_count
    upvotes - downvotes
  end

  def did_user_vote?(user)
    if location_votes.where(user: user).empty?
      false
    else
      true
    end
  end

  def check_belongs_to_user(current_user)
    if user == current_user
      @current_user = true
    else
      @current_user = false
    end
  end

  def address_to_s
    "#{street_address}, #{city}, #{state}"
  end
end
