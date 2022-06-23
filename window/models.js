let a = 10, b = 15 // Приклад

/*function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}*/

export class player {
    login // String
    password // Password
    mnemonicCode // String
    constructor(login, password, mnemonicCode){
        this.login = login
        this.password = password
        this.mnemonicCode = mnemonicCode
    }
}

export class character { // Blockchain
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
    completedQuests // ArrayOfIntegers
    completedGameEvents // ArrayOfIntegers

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
    inventory // ArrayOfIntegers

    // Functions/Функції
    constructor(
        id, 
        name, 
        level, 
        gold, 
        experience, 
        upgradePoints, 
        role,
        currentLocation,
        head,
        body,
        gloves,
        ring,
        belt,
        legs,
        strength, 
        agility,
        intelligence,
        charisma,
        sizeInventory,
        inventory ){
        this.id = id
        this.name = name
        this.level = level
        this.gold = gold
        this.experience = experience
        this.upgradePoints = upgradePoints
        this.role = role
        this.currentLocation = currentLocation
        this.head = head
        this.body = body
        this.gloves = gloves
        this.ring = ring
        this.belt = belt
        this.legs = legs
        this.strength = strength
        this.agility = agility
        this.intelligence = intelligence
        this.charisma = charisma
        this.sizeInventory = sizeInventory
        this.inventory = inventory
    }
    GetHealthPoint(){
        this.totalHealth = a*this.level+b*this.strength 
        return this.totalHealth
    }
    GetManaPoint(){
        this.totalMana = a*this.level+b*this.intelligence
        return this.totalMana
    }
    GetDamagePoint(){
        this.totalDamage = a*this.level+b*this.agility
        return this.totalDamage
    }
    GetDodgePoint(){
        this.totalDodge = a*this.level+b*this.charisma 
        return this.totalDodge
    }
    UpdateInventorySize(){
        this.sizeInventory = 8 + this.strength
    }
    GetRoleInString(){
        if(this.role == 1) return 'Мечник' 
        if(this.role == 2) return 'Чарівник' 
        if(this.role == 3) return 'Паладин' 
        if(this.role == 4) return 'Бард' 
        return 'Error'
    }
    GetNeededExperienceForNewLevel(){
        return this.level*200
    }
    AddExperienceFromLocation(){
        this.experience += Math.floor(Math.random() * (Math.ceil(101) - Math.floor(35))) + Math.floor(35)
    }
    MoveToNextLocation(){
        this.currentLocation++
    }
    CheckForLevelUp(){
        if(this.experience > this.GetNeededExperienceForNewLevel()){
            alert('Рівень збільшено!!!')
            this.experience = this.experience-this.GetNeededExperienceForNewLevel()
            this.level++
            this.upgradePoints += 2
        }
    }
}

export class item { // Blockchain
    id // Int
    level // Int
    name // String
    ownerId // Int, -1 - no owner
    requiredRole // Int
    slotName // Int
    rarity // Int ('1,2,3,4' = 'Common,Rare,Epic,Legendary')
    changeHealth // Int
    changeMana // Int
    changeDamage // Int
    changeDodge // Int
    constructor(id, level, name, ownerId, requiredRole, slotName, rarity, changeHealth, changeMana, changeDamage, changeDodge){
        this.id = id
        this.level = level
        this.name = name
        this.ownerId = ownerId
        this.requiredRole = requiredRole
        this.slotName = slotName
        this.rarity = rarity
        this.changeHealth = changeHealth
        this.changeMana = changeMana
        this.changeDamage = changeDamage
        this.changeDodge = changeDodge
    }
    GetRoleInString(){
        if(this.requiredRole == 1) return 'Мечник' 
        if(this.requiredRole == 2) return 'Чарівник' 
        if(this.requiredRole == 3) return 'Паладин' 
        if(this.requiredRole == 4) return 'Бард' 
        return 'Error'
    }
    GetSlotNameInString(){
        if(this.slotName == 1) return 'Шолом' 
        if(this.slotName == 2) return 'Обладунок' 
        if(this.slotName == 3) return 'Рукавиці' 
        if(this.slotName == 4) return 'Кільце' 
        if(this.slotName == 5) return 'Пояс' 
        if(this.slotName == 6) return 'Взуття' 
        return 'Error'
    }
    GetRarityInString(){
        if(this.rarity == 1) return 'Звичайний' 
        if(this.rarity == 2) return 'Рідкісний' 
        if(this.rarity == 3) return 'Епічний' 
        if(this.rarity == 4) return 'Легендарний' 
        return 'Error'
    }
}

export class location { // MongoDB
    id // Int
    name // String
    text // String
    buttonText // String
    constructor(id, 
                name, 
                text, 
                buttonText) {
                this.id = id
                this.name = name
                this.text = text
                this.buttonText = buttonText
    }
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