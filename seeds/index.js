const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

//const app = express();

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelpCamp';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo connection on!")
    })
    .catch(e => {
        console.log('Oh no error!');
        console.log(e);
    });

mongoose.set('useFindAndModify', false);

const sample = (arr => {
    return arr[Math.floor(Math.random() * arr.length)];
})

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 5;
        const camp = new Campground({
            author: '608fe22874545328bcb447f5',
            location: `${cities[rand1000].city}, ${cities[rand1000].state} `,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [cities[rand1000].longitude, cities[rand1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvuts8e73/image/upload/v1619962745/YelpCamp/vdil5faahwwu6gne8xiw.jpg',
                    filename: 'YelpCamp/a8blgtpwk5evowljhj7l'
                },
                {
                    url: 'https://res.cloudinary.com/dvuts8e73/image/upload/v1619962735/YelpCamp/mfkhrhfzcetjjfv2wtqz.jpg',
                    filename: 'YelpCamp/kmz4phvocviwq2h5gc7k'
                }
            ]
        })
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})