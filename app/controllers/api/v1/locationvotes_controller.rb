class Api::V1::LocationvotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    @location = Location.find(params[:id])
    @event = @location.event
    if !current_user.nil? && (location_vote_params[:upvote] == true || location_vote_params[:upvote] == false)
      location_votes = @location.location_votes
        if @location.did_user_vote?(current_user)
          vote = location_votes.find { |v| v.user == current_user }
          if location_vote_params[:upvote] && !vote.upvote && !vote.downvote
            LocationVote.update(vote, upvote: true)
          elsif location_vote_params[:upvote] && !vote.upvote && vote.downvote
            LocationVote.update(vote, downvote: false)
          elsif !location_vote_params[:upvote] && !vote.upvote && !vote.downvote
            LocationVote.update(vote, downvote: true)
          elsif !location_vote_params[:upvote] && vote.upvote && !vote.downvote
            LocationVote.update(vote, upvote: false)
          end
        elsif location_vote_params[:upvote]
          LocationVote.create(
            location: @location,
            upvote: true,
            user: current_user
          )
        elsif !location_vote_params[:upvote]
          LocationVote.create(
            location: @location,
            downvote: true,
            user: current_user
          )
        end
    end
    locations = @event.locations
    locations.each do |l|
      l.check_belongs_to_user(current_user)
    end
    render json: @location.vote_count
  end

  private

  def location_vote_params
    params.require(:location_vote).permit(:upvote, :downvote)
  end
end
