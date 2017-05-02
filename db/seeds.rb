event1 = Event.create!(user_id: 1, name: 'Jane and Bob\'s 50th Anniversary', description: 'We should get together for dinner to celebrate their 50th!', cutoff_time: 'Monday', suggested_date: 'Tuesday', suggested_time: '6:00PM', suggested_location: '229 Tremont Street')
event2 = Event.create!(user_id: 1, name: 'Matt\'s 1st Birthday Party', description: 'It\'s his special day!', cutoff_time: 'Sunday', suggested_date: 'Saturday', suggested_time: '7:00PM', suggested_location: '77 Summer Street')
event3 = Event.create!(user_id: 1, name: 'Launch\'s Holiday Party', description: 'Our annual work holiday party.', cutoff_time: 'Sunday', suggested_date: 'Wednesday', suggested_time: '5:00PM', suggested_location: '100 Winter Street')

user1 = User.create!(first_name: 'Bob', last_name: 'Barley', username: 'kbrown', email: 'brown@aol.com', password: '123456')
user2 = User.create!(first_name: 'Kate', last_name: 'Kale', username: 'kbrown2', email: 'crown@aol.com', password: '123456')
user3 = User.create!(first_name: 'Emily', last_name: 'Emu', username: 'kbrown3', email: 'drown@aol.com', password: '123456')

EventMember.create!(event: event1, user: user1)
EventMember.create!(event: event2, user: user2)
EventMember.create!(event: event3, user: user3)
