class Api::V1::LocationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @event = Event.find(params[:event_id])
    @locations = @event.locations
    @user = current_user
    render :json => @locations.to_json(:methods => :vote_count)
  end

  def show
    @user = current_user
    @location = Location.find(params[:id])
    @location_votes = @location.location_votes
    render json: @location_votes
  end

  def create
    @location = Location.new(location_params)
    @location.user_id = current_user.id
    @event = Event.find(params[:event_id])
    @location.event = @event
    if @location.save!
      render json: @location
    end
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    if !current_user.nil? && (location_vote_params[:upvote] == true || location_vote_params[:upvote] == false)
      @location = Location.find(params[:id])
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
    locations = Event.find(params[:event_id]).locations
    locations.each do |l|
      l.check_belongs_to_user(current_user)
    end
    render json: @location.location_votes
  end

  private

  def location_params
    params.permit(:id, :name, :user_id, :event_id, :description,
    :street_address, :city, :state)
  end

  def location_vote_params
    params.require(:location_vote).permit(:upvote, :downvote)
  end
end
