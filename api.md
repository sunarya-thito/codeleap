# API Reference
## Authentication
// TODO
## Courses
### Query Course Snapshot List
#### Path
```
GET /api/v1/courses
```
#### Query Parameters
- query: Search parameter (String, Optional)
- after: Id pagination offset (String, Optional)
- limit: Total items requested (Integer, Default 10)
- filter: Filter by course tags
- view: View type (Enum: all, enrolled, bookmarked, completed)
- user: The user id (String, Optional)
#### Response
```json
{
    "courses": [
        {
            "slug": "course-slug",
            "name": "Course Name",
            "description": "This is course description",
            "tags": [
                {
                    "id": "tag_id",
                    "name": "Tag Display Name"
                }
            ],
            "totalLessons": 12,
            "totalAssessments": 12,
            "userdata": {
                "bookmarked": false,
                "enrollment": {
                    "progress": 65 (Percentage),
                    "time_spent": 12312412 (Millis since epoch),
                }
            }
        }
    ]
}
```
### Query Course Data
#### Path
```
GET /api/v1/courses/[courseId]
```
#### Path Parameter
- courseId: The course id
#### Query Parameter
- userId: The user id (String, Optional)
- query: Filter section content (String, Optional)
#### Response
```json
{
    "name": "Course Name",
    "description": "This is course description",
    "tags": [
        {
            "id": "tag_id",
            "name": "Tag Display Name"
        }
    ],
    "userdata": {
        "bookmarked": false,
        "enrollment": {
            "progress": 65 (Percentage),
            "start_date": string,
            "lessons_completed": 6,
            "assessments_completed": 6,
            "next_lesson": {
                "type": "article" | "assessment",
                "title": "Links and Anchors",
                "content_time_length": 60 (Seconds),
                "content_length": 10 (Questions, Nullable if not assessment),
            }
        },
    },
    "instructor": {
        "slug": "jane-smith",
        "name": "Jane Smith",
    },
    "last_updated": 192031912 (Millis since epoch),
    "level": "beginner" | "intermediate" | "expert",
    "total_lessons": 12,
    "total_assessments": 12,
    "sections": [
        {
            "name": "Introduction to HTML",
            "description": "Learn the basics of HTML and its role in web development",
            "contents": [
                {
                    "type": "article",
                    "name": "What is HTML",
                    "articleSlug": "what-is-html",
                    "content_time_length": 60 (Seconds),
                    "unlocked": true,
                    "done": true,
                },
                {
                    "type": "assessment",
                    "name": "HTML Basic Quiz",
                    "quizSlug": "html-basic-quiz",
                    "content_time_length": 60 (Seconds),
                    "content_length": 10 (Questions),
                    "unlocked": false,
                    "result": { (This is null if test has not been taken)
                        "score": 50,
                        "pass": false,
                    },
                    "done": true,
                }
            ],
        }
    ]
}
```
### Query Lesson Data
#### Path
```
GET /api/v1/courses/[courseId]/lessons/[lessonId]
```
#### Path Parameter
- courseId: The course id
- lessonId: The lesson id
#### Query Parameter
- userId (String, Required)
#### Response
```json
{
    "content_url": "url-to-s3-bucket",
    "previous_lesson": { (Optional)
        "slug": "what-is-html",
        "name": "What is HTML",
        "type": "article",
    },
    "next_lesson": { (Optional)
        "slug": "html-quiz",
        "name": "HTML Quiz",
        "type": "assessment",
    },
}
```
### Query Assessment Data
Otomatis mulai quiz untuk user tersebut ketika ini dipanggil
#### Path
```
GET /api/v1/assessments/[assessmentId]/questions/[index]
```
#### Path Parameter
- assessmentId
- index: Nomor soal
#### Query Parameter
- userId (String, Required)
#### Response
```json
{
    "content": "MARKDOWN CONTENT",
    "answer_type": "multiple_choice" | "multiple_answer",
    "answers": [
        {
            "id": "0",
            "content": "MARKDOWN CONTENT",
            "status": "choosen" | null,
        }
    ],
    "flags": {
        "0": "answered",
        "1": "flagged",
    }
}
```
### Put Assessment Answer Status
#### Path
```
PUT /api/v1/assessments/[assessmentId]/questions/[index]
```
#### Path Parameter
- assessmentId
- index
#### Query Parameter
- answerId (String, Optional)
- flag (Boolean, Optional)
#### Response
```json
{
    "message": "SAVED",
}
```
### Review Assessment
Review, sekaligus mengakhiri assessment secara otomatis
#### Path
```
GET /api/v1/assessments/[assessmentId]/review
```
#### Path Parameter
- assessmentId
#### Query Parameter
- userId
#### Response
```json
{
    "score": percentage | null,
    "time": seconds,
    "retake": true | false,
    "total_tries": 1,
    "review": [
        {
            "content": "MARKDOWN CONTENT",
            "answers": [
                {
                    "content": "MARKDOWN CONTENT",
                    "correct": true | false,
                }
            ],
            "answer_history": [
                0,
                1,
            ]
            "score": 0.9 | null,
            "explanation": "MARKDOWN CONTENT",
        }
    ] | null,
}
```
### Mark Lesson
#### Path
```
PUT /api/v1/courses/[courseId]/lessons/[lessonId]/status
```
#### Query Parameter
- userId
- status: `done` | `none`
#### Response
```json
{
    "message": "SAVED"
}
```
### Query Certificate (Public)
#### Path
```
GET /api/v1/certificates/[certificateId]
```
#### Path Parameter
- certificateId
#### Response
```json
{
    "name": "John Doe",
    "tags": [
        {
            "id": "tag_id",
            "name": "tag name",
        }
    ],
    "date_issued": "31-12-2025",
    "course": {
        "slug": "course-slug",
        "name": "HTML Fundamentals", 
    }
}
```
### Query Certificates
#### Path
```
GET /api/v1/certificates
```
#### Query Parameter
- userId
- query
- after
#### Response
```json
{
    "certificates": [
        {
            "title": "HTML Fundamentals Certificate",
            "issued_on": "31-12-2025",
            "course": {
                "id": "course-slug",
                "name": "HTML Fundamentals",
            },
            "tags": [
                {
                    "id": "id",
                    "name": "HTML5",
                }
            ],
        }
    ]
}
```
### Query Discussion
#### Path
```
GET /api/v1/courses/[courseId]/lessons/[lessonId]/discussions
```
#### Path Parameter
- courseId
- lessonId
#### Query Parameter
- userId
- after (String, Optional)
#### Response
```json
{
    "count": 20,
    "comments": [
        {
            "id": "0",
            "content": "CONTENT MARKDOWN",
            "likes": 10,
            "dislikes": 10,
            "created_date": "31-12-2025T02:00:19.000",
            "user": {
                "photo_url": string | null,
                "name": "Display Name" | null,
                "self": true | null,
                "id": "1",
            },
            "pinned": true | null,
            "replies": 20,
        }
    ]
}
```
### Query Discussion Replies
#### Path
```
GET /api/v1/discussions/[discussionId]
```
#### Path Parameter
- discussionId
#### Query Parameter
- userId
- after (String, Optional)
#### Response
```json
{
    "count": 20,
    "comments": [
        {
            "id": "0",
            "content": "CONTENT MARKDOWN",
            "likes": 10,
            "dislikes": 10,
            "created_date": "31-12-2025T02:00:19.000",
            "user": {
                "photo_url": string | null,
                "name": "Display Name" | null,
                "self": true | null,
                "id": "1",
            },
            "replies": 20,
        }
    ]
}
```
### Post Discussion
#### Path
```
POST /api/v1/courses/[courseId]/lessons/[lessonId]/discussions
```
#### Body
```json
{
    "user": string,
    "content": string,
}
```
#### Response
```json
{
    "message": "SAVED"
}
```
### Reply Discussion
#### Path
```
POST /api/v1/discussions
```
#### Body
```json
{
    "parent": string,
    "user": string,
    "content": string,
}
```
#### Response
```json
{
    "message": "SAVED"
}
```
## User
### Query User Data
#### Path
```
GET /api/v1/user/[userId]
```
### Path Parameter
- userId
### Response
```json
{
    "user": string,
    "occupation": string | null,
    "streak": integer,
    "photo_url": string | null,
    "last_updated_photo_url": string | null,
}
```
### Update User Data
#### Path
```
PUT /api/v1/user/[userId]
```
#### Path Parameter
- userId
#### Body
```json
{
    "occupation": string | null,
}
```
#### Response
```json
{
    "message": "SAVED"
}
```
### Blockade
#### Visit
```
GET /api/v1/check
```
#### Query Parameters
- userId
#### Response
```json
{
    "active_assessment": {
        "assessment_id": "html",
        "question_index": 0,
    } | null,
    "recent_study": {
        "course_id": "course-slug",
        "lesson_id": "lesson-id",
    } | null,
}
```
### Notifications
#### Query Notifications
```
GET /api/v1/notifications
```
#### Query Parameters
- userId
- after (String, Optional)
#### Response
```json
{
    "notifications": [
        {
            "type": "certificate_achieved" | "discussion_replied",
            "data": [], // data related to types
        }
    ]
}
```
#### Data
- `certificate_achieved`:
    - `0`: Nama kursus
    - `1`: Id kursus
- `discussion_replied`:
    - `0`: Nama pembalas
    - `1`: Id pembalas
    - `2`: Nama kursus
    - `3`: Id kursus
    - `4`: Nama artikel
    - `5`: Id artikel
## Instructor

### Create Course

#### Path

```
POST /api/v1/courses
```

#### Body

```json
{
  "name": "Course Name",
  "description": "Description of the course",
  "tags": ["tag_id1", "tag_id2"],
  "level": "beginner" | "intermediate" | "expert",
  "instructor_id": "instructor-id"
}
```

#### Response

```json
{
  "message": "CREATED",
  "courseId": "generated-course-id"
}
```

### Update Course

#### Path

```
PUT /api/v1/courses/[courseId]
```

#### Body

```json
{
  "name": "Updated Course Name",
  "description": "Updated description",
  "tags": ["tag_id1"],
  "level": "intermediate"
}
```

#### Response

```json
{
  "message": "UPDATED"
}
```

### Delete Course

#### Path

```
DELETE /api/v1/courses/[courseId]
```

#### Response

```json
{
  "message": "DELETED"
}
```

### Create Section in Course (with contents)

#### Path

```
POST /api/v1/courses/[courseId]/sections
```

#### Body

```json
{
  "name": "Section Title",
  "description": "Section description",
  "contents": [
    {
      "type": "article" | "assessment",
      "ref_id": "article-or-assessment-id"
    }
  ]
}
```

#### Response

```json
{
  "message": "CREATED",
  "sectionId": "generated-section-id"
}
```

### Update Section in Course (with contents)

#### Path

```
PUT /api/v1/courses/[courseId]/sections/[sectionId]
```

#### Body

```json
{
  "name": "Updated Section Title",
  "description": "Updated description",
  "contents": [
    {
      "type": "article" | "assessment",
      "ref_id": "article-or-assessment-id"
    }
  ]
}
```

#### Response

```json
{
  "message": "UPDATED"
}
```

### Delete Section

#### Path

```
DELETE /api/v1/courses/[courseId]/sections/[sectionId]
```

#### Response

```json
{
  "message": "DELETED"
}
```

### Create Article

#### Path

```
POST /api/v1/articles
```

#### Body

```json
{
  "name": "Article Title",
  "content_time_length": 60,
  "content_url": "url-to-article-content"
}
```

#### Response

```json
{
  "message": "CREATED",
  "articleId": "generated-article-id"
}
```

### Read Article

#### Path

```
GET /api/v1/articles/[articleId]
```

#### Response

```json
{
  "name": "Article Title",
  "content_time_length": 60,
  "content_url": "url-to-article-content"
}
```

### Update Article

#### Path

```
PUT /api/v1/articles/[articleId]
```

#### Body

```json
{
  "name": "Updated Title",
  "content_time_length": 75,
  "content_url": "updated-url"
}
```

#### Response

```json
{
  "message": "UPDATED"
}
```

### Delete Article

#### Path

```
DELETE /api/v1/articles/[articleId]
```

#### Response

```json
{
  "message": "DELETED"
}
```

### Create Assessment

#### Path

```
POST /api/v1/assessments
```

#### Body

```json
{
  "name": "Assessment Title",
  "content_time_length": 90,
  "questions": [
    {
      "content": "Question markdown content",
      "answer_type": "multiple_choice" | "multiple_answer",
      "answers": [
        {"content": "Answer A", "correct": true},
        {"content": "Answer B", "correct": false}
      ],
      "explanation": "Explanation markdown content"
    }
  ]
}
```

#### Response

```json
{
  "message": "CREATED",
  "assessmentId": "generated-assessment-id"
}
```

### Read Assessment

#### Path

```
GET /api/v1/assessments/[assessmentId]
```

#### Response

```json
{
  "name": "Assessment Title",
  "content_time_length": 90,
  "questions": [ ... ]
}
```

### Update Assessment

#### Path

```
PUT /api/v1/assessments/[assessmentId]
```

#### Body

```json
{
  "name": "Updated Assessment Title",
  "content_time_length": 100,
  "questions": [ ... ]
}
```

#### Response

```json
{
  "message": "UPDATED"
}
```

### Delete Assessment

#### Path

```
DELETE /api/v1/assessments/[assessmentId]
```

#### Response

```json
{
  "message": "DELETED"
}
```

### List User Enrollments in a Course

#### Path

```
GET /api/v1/courses/[courseId]/enrollments
```

#### Response

```json
{
  "enrollments": [
    {
      "user_id": "user-id",
      "progress": 75,
      "start_date": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### Update User Enrollment in a Course

#### Path

```
PUT /api/v1/courses/[courseId]/enrollments/[userId]
```

#### Body

```json
{
  "progress": 90
}
```

#### Response

```json
{
  "message": "UPDATED"
}
```

### Delete User Enrollment in a Course

#### Path

```
DELETE /api/v1/courses/[courseId]/enrollments/[userId]
```

#### Response

```json
{
  "message": "DELETED"
}
```

### Issue Certificate

#### Path

```
POST /api/v1/certificates
```

#### Body

```json
{
  "userId": "user-id",
  "courseId": "course-id",
  "date_issued": "31-12-2025" // optional
}
```

#### Response

```json
{
  "message": "CREATED",
  "certificateId": "generated-id"
}
```

### Delete Certificate

#### Path

```
DELETE /api/v1/certificates/[certificateId]
```

#### Response

```json
{
  "message": "DELETED"
}
```
