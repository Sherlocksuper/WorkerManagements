import {useEffect, useRef} from "react";
import {getAllEmp, IEmp} from "../../../api/emp";
import * as echarts from "echarts";
import {Gender} from "../../../constants";
import {getAllStudent} from "../../../api/student";

const options1 = {
    title: {
        text: '员工统计',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                {value: 0, name: '男'},
                {value: 0, name: '女'},
            ] as {
                value: number;
                name: string;
            }[],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


const StudentInfo = () => {

    const chart1ref = useRef(null);

    useEffect(() => {

        let chat1 = echarts.init(chart1ref.current);

        getAllStudent({}).then((res) => {
            let data: IEmp[] = res.data;

            data.forEach((item: IEmp) => {
                if (item.gender === Gender.Male) {
                    options1.series[0].data[0].value += 1;
                } else {
                    options1.series[0].data[1].value += 1;
                }
            })
        }).then(() => {
            chat1.setOption(options1);

        });

        return () => {
            chat1.dispose();
        }

    }, []);

    return (
        <div style={{
            height: '100%',
            width: '100%'
        }}>
            <div ref={chart1ref} style={{
                height: '300px',
                width: '300px'
            }}></div>
        </div>
    );
}

export default StudentInfo;