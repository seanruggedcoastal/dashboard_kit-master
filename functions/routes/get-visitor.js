require('dotenv').config();

const moment = require('moment-timezone')
const Visitor = require('../models/Visitor');
const validateHttpMethod = require('../utils/validateHttpMethod');

exports.handler = async (event, context) => {
  try {
    // check http method
    await validateHttpMethod(event, ['GET']);

    const { month, timezone } = event.queryStringParameters;

    let visitCountAgg = [
      {
        $facet: {
          path:[
            {
              $group: {_id: '$path', count: {$sum: 1}}
            }
          ],
          referrer:[
            {
              $group: {_id: '$referrer', count: {$sum: 1}}
            }
          ],
          country: [
            {
              $group: {_id: '$country', count: {$sum: 1}}
            }
          ],
          device: [
            {
              $group: {_id: '$device', count: {$sum: 1}}
            }
          ],
          browser: [
            {
              $group: {_id: '$browser', count: {$sum: 1}}
            }
          ]
        }
      }
    ];

    let dateDataAgg = [
      timezone ? {
        "$project": {
          "createdAt": { "$dateToString": { format: "%Y-%m-%d", date: "$createdAt", timezone } }
        }
      } : {
        "$project": {
          "createdAt": { "$dateToString": { format: "%Y-%m-%d", date: "$createdAt" } }
        }
      },
      {
        "$group": {
          "_id": "$createdAt",
          "count": { "$sum": 1 }
        }
      }
    ]

    if(month){
      let startDate = new Date(month+'-01');
      let endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth()+1)
      endDate.setDate(endDate.getDate()-1)
      endDate = (endDate.getDate()+'').length === 2 ? endDate.getDate() : `0${endDate.getDate()}`

      if(timezone){
        startDate = new Date(moment.tz(month+'-01T00:00:00.000', timezone).utc())
        endDate = new Date(moment.tz(month+'-'+endDate+'T23:59:59.999', timezone).utc().toISOString())
      }else{
        endDate.setHours(23)
        endDate.setMinutes(59)
        endDate.setSeconds(59)
        endDate.setMilliseconds(999)
      }

      const filter = {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      }
      visitCountAgg.unshift(filter)
      dateDataAgg.unshift(filter)
    }

    const visitorCount = await Visitor.aggregate(visitCountAgg)
    const dateData = await Visitor.aggregate(dateDataAgg)

    // all went well
    return {
      statusCode: 200,
      headers:    {
        'Cache-Control': 'no-store', // prevent caching of response
        Pragma:          'no-cache', // prevent caching of response
      },
      body: JSON.stringify({
        visitorCount: visitorCount[0],
        dateData: dateData
      }), // empty body, token send in headers
    };
  } catch (error) {
    // something went wrong, respond with error
    return {
      statusCode: error.statusCode || 500,
      headers:    error.headers || {},
      body:       JSON.stringify(error.message),
    };
  }
};
