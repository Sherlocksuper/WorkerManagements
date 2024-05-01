package modal

import "gorm.io/gorm"

//| \|- id         | number | 非必须 |      | id                                                           |      |
//| -------------- | ------ | ------ | ---- | ------------------------------------------------------------ | ---- |
//| \|- username   | string | 非必须 |      | 用户名                                                       |      |
//| \|- name       | string | 非必须 |      | 姓名                                                         |      |
//| \|- password   | string | 非必须 |      | 密码                                                         |      |
//| \|- entrydate  | string | 非必须 |      | 入职日期                                                     |      |
//| \|- gender     | number | 非必须 |      | 性别 , 1 男 ; 2 女                                           |      |
//| \|- image      | string | 非必须 |      | 图像                                                         |      |
//| \|- job        | number | 非必须 |      | 职位, 说明: 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |      |
//| \|- deptId     | number | 非必须 |      | 部门id                                                       |      |
//| \|- createTime | string | 非必须 |      | 创建时间                                                     |      |
//| \|- updateTime | string | 非必须 |      | 更新时间                                                     |      |

type Emps struct {
	gorm.Model
	Username  string `json:"username"`
	Name      string `json:"name"`
	Password  string `json:"password"`
	Entrydate string `json:"entryDate"` //入职日期
	Gender    Gender `json:"gender"`    //性别
	Image     string `json:"image"`
	Job       Job    `json:"job"`
	DeptID    uint   `json:"deptId"`
}

// Gender Gender枚举值
type Gender uint

const (
	Male   Gender = 1
	FeMail Gender = 2
)

// Job 工作枚举值
type Job uint

const (
	// HeadTeacher 1 班主任,2 讲师, 3 学工主管, 4 教研主管, 5 咨询师 |
	HeadTeacher Job = 1
	Lecturer    Job = 2
	Dean        Job = 3
	Research    Job = 4
	Counselor   Job = 5
)
