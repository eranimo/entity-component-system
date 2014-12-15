"use strict";

function ECS() {
	this.lastId = 0;
	this.entities = {};
	this.systems = {};
}
ECS.prototype.addEntity = function() {
	var id = this.lastId;
	this.entities[id] = {};
	this.lastId++;
	return id;
};
ECS.prototype.getEntity = function(entity) {
	return this.entities[entity];
};
ECS.prototype.removeEntity = function(entity) {
	delete this.entities[entity];
};
ECS.prototype.addComponent = function(entity, name, component) {
	this.entities[entity][name] = component;
};
ECS.prototype.removeComponent = function(entity, name) {
	delete this.entities[entity][name];
};
ECS.prototype.addSystem = function(group, system) {
	getSystemGroup(this, group).push(system);
};
ECS.prototype.run = function(group) {
	var args = Array.prototype.slice.call(arguments, 1);
	var ecs = this;
	getSystemGroup(ecs, group).forEach(function(system) {
		Object.keys(ecs.entities).forEach(function(entity) {
			system.apply(ecs, [ecs.entities[entity]].concat(args));
		});
	});
};

function getSystemGroup(ecs, group) {
	if (!ecs.systems[group]) {
		ecs.systems[group] = [];
	}
	return ecs.systems[group];
}

module.exports = ECS;