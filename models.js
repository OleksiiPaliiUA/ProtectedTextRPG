let a = 10, b = 15 // Приклад


class player {
    password // Password
    mnemonicCode // String
}

class character { // Blockchain
    // Basic parameters/Базові параметри
    id // Int
    name // String
    level // Int
    gold // Int
    experience // Int
    upgradePoints // Int
    role // Int
    checkPoint // Int
    currentLocation // Int
    completedQuests = new Set() 
    completedGameEvents = new Set() 

    // Artifacts on player/Предмети на гравцеві
    head // Int, 0 - None. 
    body // Int, 0 - None
    gloves // Int, 0 - None
    ring // Int, 0 - None
    belt // Int, 0 - None
    legs // Int, 0 - None

    // Attributes/Атрибути
    strength // Int
    agility // Int
    intelligence // Int
    charisma // Int

    // Current points/Актуальні бали (No get/send)
    totalHealth // Int
    totalMana // Int
    totalDamage // Int
    totalDodge // Int

    // Inventory/Інвентар
    sizeInventory // Int, = 8 + strength, 18 - max / No get/send
    inventory = new Set()

    // Functions/Функції
    UpdatePoints(){
        this.totalHealth = a*this.level+b*this.strength // Приклад
    }
}

class item { // Blockchain
    id // Int
    level // Int
    name // String
    ownerId // Int, -1 - no owner
    requiredRole // Int
    slotName // String
    rarity // Int ('1,2,3,4' = 'Common,Rare,Epic,Legendary')
    changeHealth // Int
    changeMana // Int
    changeDamage // Int
    changeDodge // Int
}

class location { // MongoDB
    id // Int
    name // String
    text // String
    buttonText // String
}

class gameEvent { // MongoDB
    id // Int
    locationId // id
    text // String
    accessButtonText // String
    declineButtonText // String
    avarageStrength // Int
    avarageAgility // Int
    avarageIntelligence // Int
    avarageCharisma // Int
    changeGold // Int
    changeExperience // Int
}

class gameQuest { // MongoDB
    id // Int
    text // String
    accessButtonText // String
    declineButtonText // String
    takeLocationId // Int
    startLocaltionId // Int 
    endLocationId // Int
    rewardGold // Int
    rewardExperience // Int
}
