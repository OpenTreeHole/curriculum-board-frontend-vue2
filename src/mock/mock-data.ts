import Mock from 'mockjs'
import { RequestInfo } from '@/mock/types'
import { omit } from 'lodash-es'

const courseGroups = Mock.mock({
  'list|10-20': [
    {
      'id|+1': 1, // Chinese name
      department: '@cword(6,12)', // word
      code: /[A-Z]{4}[0-9]{6}/,
      name: '@cword(5-10)'
    }
  ]
}).list

let maxId = 0,
  maxReviewId = 0
for (const courseGroup of courseGroups) {
  courseGroup.course_list = Mock.mock({
    'list|1-10': [
      {
        'id|+1': maxId + 1,
        code: courseGroup.code,
        code_id: new RegExp(courseGroup.code + '\\.[0-9]{2}H?'),
        'credit|4-5': 4,
        department: courseGroup.department,
        'max_student|10-100': 1,
        name: courseGroup.name,
        teacher: '@cname',
        'semester|1-4': 1,
        'week_hour|1-6': 1,
        year: '2020-2021学年',
        'review_list|1-10': [
          {
            'id|+1': maxReviewId + 1,
            content: '@cparagraph',
            rank: {
              'overall|1-5': 1,
              'content|1-5': 1,
              'workload|1-5': 1,
              'assessment|1-5': 1
            },
            'remark|0-100': 1,
            title: '@csentence',
            time_created: '@datetime("yyyy-MM-ddTHH:mm:ss.000Z")',
            is_me: false
          }
        ]
      }
    ]
  }).list
  maxId += courseGroup.course_list.length
  maxReviewId += courseGroup.course_list.reduce((p: number, v: { review_list: any[] }) => p + v.review_list.length, 0)
}

console.log('CourseGroups:', courseGroups)

export default [
  {
    url: '/api/courses',
    type: 'get',
    response: (_res: RequestInfo) => {
      return courseGroups.map((v: any) => omit(v, 'course_list'))
    }
  },
  {
    url: '/api/courses',
    type: 'get',
    response: (_res: RequestInfo) => {
      return courseGroups.map((v: any) => omit(v, 'course_list'))
    }
  }
]
