import React, { useState, useEffect } from "react";

import GoalInput from "./components/goals/GoalInput";
import CourseGoals from "./components/goals/CourseGoals";
import ErrorAlert from "./components/UI/ErrorAlert";

function App() {
    const [loadedGoals, setLoadedGoals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchData() {
            setIsLoading(true);

            try {
                // 도커 네트워크를 사용해도 리액트는 브라우저에서 js가 실행되기 때문에 브라우저가 이해할 수 있는 localhost로 적어줘야 한다. 백엔드 컨테이너명을 적으면 브라우저는 이해하지 못한다.
                // 백엔드를 실행할 때 네트워크를 사용하고 있다고 해도 80포트를 연결해야한다.
                const response = await fetch("http://localhost/goals");

                const resData = await response.json();

                if (!response.ok) {
                    throw new Error(
                        resData.message || "Fetching the goals failed."
                    );
                }

                setLoadedGoals(resData.goals);
            } catch (err) {
                setError(
                    err.message ||
                        "Fetching goals failed - the server responsed with an error."
                );
            }
            setIsLoading(false);
        }

        fetchData();
    }, []);

    async function addGoalHandler(goalText) {
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost/goals", {
                method: "POST",
                body: JSON.stringify({
                    text: goalText,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.message || "Adding the goal failed.");
            }

            setLoadedGoals((prevGoals) => {
                const updatedGoals = [
                    {
                        id: resData.goal.id,
                        text: goalText,
                    },
                    ...prevGoals,
                ];
                return updatedGoals;
            });
        } catch (err) {
            setError(
                err.message ||
                    "Adding a goal failed - the server responsed with an error."
            );
        }
        setIsLoading(false);
    }

    async function deleteGoalHandler(goalId) {
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost/goals/" + goalId, {
                method: "DELETE",
            });

            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.message || "Deleting the goal failed.");
            }

            setLoadedGoals((prevGoals) => {
                const updatedGoals = prevGoals.filter(
                    (goal) => goal.id !== goalId
                );
                return updatedGoals;
            });
        } catch (err) {
            setError(
                err.message ||
                    "Deleting the goal failed - the server responsed with an error."
            );
        }
        setIsLoading(false);
    }

    return (
        <div>
            {error && <ErrorAlert errorText={error} />}
            <GoalInput onAddGoal={addGoalHandler} />
            {!isLoading && (
                <CourseGoals
                    goals={loadedGoals}
                    onDeleteGoal={deleteGoalHandler}
                />
            )}
        </div>
    );
}

export default App;
