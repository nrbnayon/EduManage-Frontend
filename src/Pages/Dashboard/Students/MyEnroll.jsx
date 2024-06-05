import useEnrollInfo from "../../../hooks/useEnrollInfo";

const MyEnroll = () => {
  const { enrollInfo, isLoading, error } = useEnrollInfo();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {enrollInfo.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <>
          <p>MY Enroll Course: {enrollInfo.length} </p>
          <ul>
            {enrollInfo.map((course, index) => (
              <li key={index}>
                {course.courseTitle} by {course.teacherName}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MyEnroll;
