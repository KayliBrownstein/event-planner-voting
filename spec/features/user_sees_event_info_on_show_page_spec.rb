require 'spec_helper'

feature "User sees event information" do
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
      id: 1,
      user_id: 1,
      name: "Birthday Party",
      description: 'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.',
      cutoff_time: "2017-05-29"
    )
  end

  scenario "when user goes to show page, event information is shown" do
    visit `/events/#{event.id}`

    expect(page).to have_content `#{event.name}`
    expect(page).to have_content `#{event.description}`
  end
end
