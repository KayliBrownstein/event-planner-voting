require 'rails_helper'

describe Api::V1::EventsController, type: :controller do
  describe 'GET /api/v1/events' do
    let(:event) do
      User.create(
        id: 1,
        username: "jarlax3",
        email: "jarlax3@launchacademy.com",
        password: 'password',
        first_name: 'Jar',
        last_name: 'Smith'
      )
      Event.create(
        user_id: 1,
        name: "Birthday Party",
        description: 'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.',
        cutoff_time: "Monday"
      )
    end

    it 'retrieves from database' do

      get :index, event_id: event.id
      json = JSON.parse(response.body)

      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(:ok)
    end
  end
end
