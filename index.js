
const getElementById = (id) => {
    const element = document.getElementById(`option-${id}`);
    return element;
}

const getTestId = () => {
    const div = document.getElementById("particular-test");
    const testId = div.getAttribute("data-qlty-test");

    return testId;
}

const getSolutions = async (testId) => {
    let solutions = await fetch(`https://testy.quali.me/ajax/solutions/${testId}`);
    solutions = await solutions.json();

    return solutions;
}

const activateInputs = (solutions) => {
    for (let i = 0; i < solutions.length; i++) {
        const solution = solutions[i];
        const options = solution.options;

        for (let j = 0; j < options.length; j++) {
            const option = options[j];

            if (solution.type == 3) {
                const input = getElementById(option.id);

                if (input) {
                    input.value = option.value;
                }

            } else {
                const input = getElementById(option.id);

                if (input) {
                    input.checked = true;
                }
            }
        }
    }
}

const main = async () => {
    const testId = getTestId();
    const solutions = await getSolutions(testId);
    await activateInputs(solutions);
}

main();
