const express = require('express');
const knex = require("../db/client");
const router = express.Router();

router.get("/:id/teamForm", (req, res, next) => { 
    knex("cohorts")
    .where("id", req.params.id)
    .first()
    
    .then(cohort => {
       
        const method = req.query.method;
        const quantity = req.query.quantity;
        const members = cohort.members;

        const teamSort = (members, quantity, method) => {
    
            if ( method == 'teamCount'){
        
                let names = members.split(',');
                let shuffledNames = [];
            
                while (names.length != 0 ){
                    random = Math.floor(Math.random()* names.length)
                    shuffledNames.push(names.splice(random, 1))
                }
                shuffledNames = shuffledNames.flat()
            
                let teams = [];
                for( let i = 0 ; i < quantity ; i ++){
                    teams[i] = [];
                }
            
                z = 0;
                while (shuffledNames != 0 ){
                    if (z == teams.length){
                        z = 0 
                }
                teams[z].push(shuffledNames.pop())
                z++
                }
                return teams;
                }
        
                if ( method == 'perTeam'){
            
                let names = members.split(',');
                let shuffledNames = [];
            
                while (names.length != 0 ){
                    random = Math.floor(Math.random()* names.length)
                    shuffledNames.push(names.splice(random, 1))
                }
                shuffledNames = shuffledNames.flat()
                let nbrOfTeams = Math.ceil(shuffledNames.length / quantity) 
                let teams = [];
                // for( let i = 0 ; i < nbrOfTeams ; i ++){
                //     teams[i] = [];
                // }
            
                // z = 0;
                // while (shuffledNames != 0 ){
                //     if (z == teams.length){
                //         z = 0 
                // }
                // teams[z].push(shuffledNames.pop())
                // z++
                // }
                let teamsArray = [];
                for (let i = 0; i < nbrOfTeams; i++){
                teamsArray.push([])
                }   
                // console.log(teamsArray)


                //#3
                while (shuffledNames.length > 0){
                for (let i = 0; i < teamsArray.length; i++){
                    if (shuffledNames.length > 0){
                    for (let j = 0; j < quantity; j++){
                        if(shuffledNames.length > 0) {
                    teamsArray[i].push(shuffledNames.pop())
                        } else {break}
                    }
                    } else {
                    break
                    }
                }
                }
                // return teams;
                return teamsArray
        
                }
        }
        const teams = teamSort(members, quantity, method)
console.log(teams)

        res.render("cohorts/show", { 
            teams: teams,
            cohort: cohort, 
            method: method,
            members: members,
            quantity: quantity,
            teamSort: teamSort});
        })
    });

// Render localhost:4545/cohorts/new (form to submit -> create new cohort)
router.get('/new', (req, res) => {
    res.render('cohorts/new');
});

// Takes the info from the form and insert them into the table
router.post("/", (req, res) => {
    knex("cohorts")
      .insert({
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        members: req.body.members
      })
      .returning("*")
      .then(cohorts => {
        const [cohort] = cohorts;
        res.redirect(`/cohorts/${cohort.id}`);
        });
    });

    // showing a single cohort
    router.get("/:id", (req, res, next) => { 
    knex("cohorts")
        .where("id", req.params.id)
        .first()
        
        .then(cohort => {
        if (!cohort) {
            next(new Error("Cohort not found"));
        } else {

        const method = req.query.method;
        const quantity = req.query.quantity;
        const members = cohort.members
        const id = cohort.id

        res.render("cohorts/show", { 
            teams: [],
            cohort: cohort, 
            method: method,
            quantity: quantity,
            members: members,
            id: id});
    }
    });
});

// Show all cohorts 
router.get("/", (req, res) => {
knex("cohorts")
    .orderBy("name", "desc")
    .then(cohorts => {
    res.render("cohorts/index", { cohorts: cohorts });
    });
});

// delete a post 
router.delete("/:id", (req, res) => {
    knex("cohorts")
      .where("id", req.params.id)
      .del()
      .then(() => {
        res.redirect("/cohorts");
      });
});

// takes info from form 
router.get("/:id/edit", (req, res) => {
knex("cohorts")
    .where("id", req.params.id)
    .first()
    .then(cohort => {
    res.render("cohorts/edit", { 
        cohort: cohort });
    });
});
  
// "upload the updated info into the database"
router.patch("/:id", (req, res) => {
knex("cohorts")
    .where("id", req.params.id)
    .update({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    members: req.body.members
    })
    .then(() => {
    res.redirect(`/cohorts/${req.params.id}`);
    });
});

module.exports = router;