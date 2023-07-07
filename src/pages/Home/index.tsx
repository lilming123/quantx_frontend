import ReactEcharts from "echarts-for-react"

const Home: React.FC<any> = ({fromData}) => {

    return (
        <div>
            <ReactEcharts option={fromData}
                          style={{
                              top:150,
                              height: 600,
                              width:'88%'
                          }
                          }
            />
        </div>
    );
};
export default Home;