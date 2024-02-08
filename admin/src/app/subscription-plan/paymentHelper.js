import axios from 'axios';

async function paymentHelper(camount,currency,subscriptionId){
    try{
        const token = localStorage.getItem('token');
        console.log("token",token);

        const loadScript = (src) => {
            return new Promise((resolve) => {
              const script = document.createElement("script");
              script.src = src;
              script.onload = () => {
                resolve(true);
              };
              script.onerror = () => {
                resolve(false);
              }
              document.body.appendChild(script);
            });
        };

        let orderId = "MYT" + Math.floor(Math.random() * Math.floor(Math.random * Date.now()));
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            return "Order Id Is Not Generated";
        }

        let paymentRes = {
          order_id : orderId,
          amount : camount,
          currency : currency,
          receipt : orderId
        };

        let result = await axios.post('http://localhost:3005/api/payment/createOrder',paymentRes,{
          headers:{
            'Authorization':token
          }
        });

        if(!result.data.data){
          return "Some Error Occured!"
        }
        else{
          let options = {
            key:'rzp_test_5FcvK0MsUDGkTa',
            currency:result.data.data.currency,
            amount:result.data.data.amount,
            order_id:result.data.data.id,
            name:'MyYoutube',
            description:'Test Transaction',
            handler: async function (response){
              const body = { paymentId: response.razorpay_payment_id, amount: camount, subscriptionId: subscriptionId };
              const result = await axios.post('http://localhost:3005/api/payment/placeOrder',body,{
                headers:{
                  'Authorization':token
                }
              });
              console.log("result is", result);
            },
            prefill:{
              email:`test123@gmail.com`,
              firstName:`test`,
              lastName:`user`,
              contact:`8989786464`
            },
            notes:{
              address:'Razorpay Corporate Office'
            },
            theme:{
              color:'#800000'
            },
          };
          let paymentObject = new window.Razorpay(options);
          paymentObject.open();

          // const final_user_details = localStorage.getItem('user');
          // const FINAL_USER_DETAILS = JSON.parse(final_user_details);
          // const final_user_details_response = await axios.post(`http://localhost:9001/api/users/userDetail/${FINAL_USER_DETAILS.userId}`);
          // const final_available_coins = final_user_details_response.data.availableCoins;
          // return final_available_coins;
        }
    }
    catch(error){
        return error;
    }
}

export default paymentHelper