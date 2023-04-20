const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const checkCurrentState = 

let state = {};


function startGame(){
    state = {}
    showTextNode(1)
};

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === 
    textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
};


function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}


// Text Nodes
const textNodes = [
    //ID 1
    {
        id: 1,
        text: 'You awaken to the sounds of a chilling wind on a desolate sand planet. You are alone.',
        options: [
            {
                text: 'Walk North',
                setState: { walkedNorth: true },
                nextText: 2
            },
            {
                text: 'Walk South',
                setState: { walkedSouth: true},
                nextText: 2
            },
            {
                text: 'Walk East',
                setState: { walkedEast: true},
                nextText: 2
            },
            {
                text: 'Walk West as Eli had done before you',
                nextText: 3
            }
        ]
    },
    //ID 1.2
    {
        id:1.2,
        text: `You return to your original position; however, slightly disoriented, you're not sure if you have.`,
        options: [
            {
                text: 'Walk North',
                setState: { walkedNorth: true },
                nextText: 2.2
            },
            {
                text: 'Walk South',
                setState: { walkedSouth: true},
                nextText: 2.2
            },
            {
                text: 'Walk East',
                setState: { walkedEast: true},
                nextText: 2.2
            },
            {
                text: 'Walk West as Eli had done before you',
                nextText: 3
            }
        ]
    },
    //ID 2
    {
        id: 2,
        text: 'As you venture out towards a single direction, you seem to understand the severity of your situation.',
        options: [
            {
                text: 'Focus on the Horizon',
                requiredState: (currentState) => currentState.walkedNorth,
                setState: { walkedNorth: false, horizon: true},
                nextText: 4
            },
            {
                text: 'Continue South',
                requiredState: (currentState) => currentState.walkedSouth,
                setState: {walkedSouth: false, continueSouth: true},
                nextText: 5
            },
            {
                text: 'Return to OG spot',
                nextText: 1.2,
                setState: {walkedNorth: false, walkedSouth: false, walkedEast: false}
            },
        ]
    },
    //ID 2.2
    {
        id: 2.2,
        text: 'As you begin to walk in your chosen direction, you begin to ruminate about your life, who were you?',
        options: [
            {
                text: 'A Butcher',
                requiredState: (currentState) => currentState.walkedNorth,
                setState: { walkedNorth: false, butcher: true},
                nextText: 2.3
            },
            {
                text: 'A Soldier',
                requiredState: (currentState) => currentState.walkedNorth,
                setState: { walkedNorth: false, soldier: true},
                nextText: 2.3
            },
        ]
    },
    //ID 2.3
    {
        id: 2.3,
        text: `That's right you were a ${checkCurrentState}`,
    },
    //ID 3
    {
        id: 3,
        text: 'You have found GOD.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    //ID 4
    {
        id: 4,
        text: 'What seems like a military outpost, barren; however, intact, lies ahead of you',
        options: [
            {
                text: 'Walk towards the outpost',
                requiredState: (currentState) => currentState.horizon,
                setState: { horizon: false, towardsOutpost: true},
                nextText: 6  
            },
        ]
    },
    //ID 6
    {
        id: 6,
        text: `As you draw closer to the outpost, you immediately feel as if you are no longer alone.
               As a wave of anxiety washes over you, your suspicions are confirmed when you begin to hear the rumbling of what seems to be machinery`,
        options: [
            {   
                text: 'Look for a hiding spot',
                requiredState: (currentState) => currentState.towardsOutpost,
                setState: {towardsOutpost: false, hidingSpot: true},
            },
        ]
    },
]

startGame();
