require 'rails_helper'

describe Api::V1::DatetimesController, type: :controller do
  describe 'GET /api/v1/events/datetimes' do
    let!(:datetime) do
      User.create(
        id: 1,
        username: "jarlax3",
        email: "jarlax3@launchacademy.com",
        password: 'password',
        first_name: 'Jar',
        last_name: 'Smith'
      )
      Event.create(
        id: 1,
        user_id: 1,
        name: "Birthday Party",
        description: 'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.',
        cutoff_time: "Monday"
      )
      Datetime.create(
        id: 1,
        user_id: 1,
        event_id: 1,
        date: '2017-05-12',
        time: '19:00'
      )
    end

    it 'retrieves from database' do
      get :index, event_id: Event.first.id
      json = JSON.parse(response.body)

      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(:ok)
    end
  end
end
