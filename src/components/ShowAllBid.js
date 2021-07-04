import React,{useContext} from 'react'
import { withRouter } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import { BidContext } from '../BidContext';

function ShowAllBid(props) {
    const [userData , setUserData] = useContext(BidContext)
    let user = {};

    for(let i = 0 ; i < userData.length ; i++){
        if(userData[i].id == props.match.params.id){
            user = userData[i]
        }
    }

    let bids = user && user.bids &&  user.bids.map((bid) => {
        return bid.amount;
    })

    let  labels = user && user.bids.map((bid) => {
        return bid.carTitle;
    })


    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      let data = {
        labels: labels,
        datasets: [
          {
            label: '# of Bids',
            data:bids ,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
            borderWidth: 2,
          },
        ],
      };

    return(
        <div style={{width:'60vw',height:'70vh',margin:'auto'}}>
            <Bar data={data} options={options} />
        </div>
        
    )
   
}

export default withRouter(ShowAllBid)
