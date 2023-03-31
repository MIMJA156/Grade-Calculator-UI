export class Table {
	constructor(classData) {
		this.reload(classData);
	}

	reload(classData) {
		if (!classData) classData = this.data;
		this.cells = [];

		for (let i = 0; i < classData["assignments"].length; i++) {
			const assignment = classData["assignments"][i];
			this.cells.push(this.createCell(i, assignment.name, assignment.type, `${parseFloat(assignment.score)}/${parseFloat(assignment.total)}`));
		}

		if (this.parent) {
			this.parent.empty();
			this.appendCells(this.parent);
		}

		this.data = classData;
	}

	createCell(_index, _name, _type, _score) {
		let tableRow = $("<tr>");

		let name = $(`<td>${_name}</td>`);
		let type = $(`<td>${_type}</td>`);
		let score = $(`<td>${_score}</td>`);
		let editButton = $(`<button class="editButton"><i class="bi bi-pencil-square"></i></button>`);
		let delButton = $(`<button class="deleteButton" data-id="${_index}"><i class="bi bi-x-lg"></i></button>`);

		delButton.click((event) => {
			let indexOfCell = parseInt($(event.target).parent().data("id"));
			this.data["assignments"].splice(indexOfCell, 1);
			this.reload();
		});

		tableRow.append(name, type, score, editButton, delButton);
		return tableRow;
	}

	appendCells(parent) {
		let table = $("<table>");
		table.addClass("table table-hover");

		let headers = [$("<th>Name</th>"), $("<th>Type</th>"), $("<th>Score</th>")];
		table.append($("<thead>").append(headers));
		table.append($("<tbody>").append(this.cells));

		parent.append(table);

		this.parent = parent;
	}
}
