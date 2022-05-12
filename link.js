class Link{
    constructor(bodyA, bodyB){
        var ultimoLink = bodyA.body.bodies.length-2;
        this.link = Constraint.create({
            bodyA: bodyA.body.bodies[ultimoLink],
            pointA: {x: 0, y: 0},
            bodyB: bodyB,
            pointB: {x: 0, y: 0},
            length: 0,
            stiffness: 0.01
        })
        World.add(world, this.link);
    }
    soltar(){
        World.remove(world, this.link);
    }
}