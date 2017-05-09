class Api::V1::VotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    @current_user = current_user
    @location = Location.find(params[:id])
    @location_votes = @location.location_votes.find(location_id && current_user.id)
    @location_votes.update(vote_params)
  end

  private

  def vote_params
    params.permit(:upvote, :downvote, :user_id, :location_id)
  end
end
