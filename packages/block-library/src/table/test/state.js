/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	createTable,
	updateCellContent,
	insertRow,
	deleteRow,
	insertColumn,
	deleteColumn,
	getTableStyles,
} from '../state';

const table = deepFreeze( {
	body: [
		{
			cells: [
				{
					content: [],
					tag: 'td',
				},
				{
					content: [],
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: [],
					tag: 'td',
				},
				{
					content: [],
					tag: 'td',
				},
			],
		},
	],
} );

const tableWithContent = deepFreeze( {
	body: [
		{
			cells: [
				{
					content: [],
					tag: 'td',
				},
				{
					content: [],
					tag: 'td',
				},
			],
		},
		{
			cells: [
				{
					content: [],
					tag: 'td',
				},
				{
					content: [ 'test' ],
					tag: 'td',
				},
			],
		},
	],
} );

describe( 'createTable', () => {
	it( 'should create a table', () => {
		const state = createTable( { rowCount: 2, columnCount: 2 } );

		expect( state ).toEqual( table );
	} );
} );

describe( 'updateCellContent', () => {
	it( 'should update cell content', () => {
		const state = updateCellContent( table, {
			section: 'body',
			rowIndex: 1,
			columnIndex: 1,
			content: [ 'test' ],
		} );

		expect( state ).toEqual( tableWithContent );
	} );
} );

describe( 'insertRow', () => {
	it( 'should insert row', () => {
		const state = insertRow( tableWithContent, {
			section: 'body',
			rowIndex: 2,
		} );

		const expected = {
			body: [
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
						{
							content: [],
							tag: 'td',
						},
					],
				},
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
						{
							content: [ 'test' ],
							tag: 'td',
						},
					],
				},
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
						{
							content: [],
							tag: 'td',
						},
					],
				},
			],
		};

		expect( state ).toEqual( expected );
	} );
} );

describe( 'insertColumn', () => {
	it( 'should insert column', () => {
		const state = insertColumn( tableWithContent, {
			section: 'body',
			columnIndex: 2,
		} );

		const expected = {
			body: [
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
						{
							content: [],
							tag: 'td',
						},
						{
							content: [],
							tag: 'td',
						},
					],
				},
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
						{
							content: [ 'test' ],
							tag: 'td',
						},
						{
							content: [],
							tag: 'td',
						},
					],
				},
			],
		};

		expect( state ).toEqual( expected );
	} );
} );

describe( 'deleteRow', () => {
	it( 'should delete row', () => {
		const state = deleteRow( tableWithContent, {
			section: 'body',
			rowIndex: 0,
		} );

		const expected = {
			body: [
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
						{
							content: [ 'test' ],
							tag: 'td',
						},
					],
				},
			],
		};

		expect( state ).toEqual( expected );
	} );
} );

describe( 'deleteColumn', () => {
	it( 'should delete column', () => {
		const state = deleteColumn( tableWithContent, {
			section: 'body',
			columnIndex: 0,
		} );

		const expected = {
			body: [
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
					],
				},
				{
					cells: [
						{
							content: [ 'test' ],
							tag: 'td',
						},
					],
				},
			],
		};

		expect( state ).toEqual( expected );
	} );

	it( 'should delete all rows when only one column present', () => {
		const tableWithOneColumn = {
			body: [
				{
					cells: [
						{
							content: [],
							tag: 'td',
						},
					],
				},
				{
					cells: [
						{
							content: [ 'test' ],
							tag: 'td',
						},
					],
				},
			],
		};
		const state = deleteColumn( tableWithOneColumn, {
			section: 'body',
			columnIndex: 0,
		} );

		const expected = {
			body: [],
		};

		expect( state ).toEqual( expected );
	} );

	describe( 'getTableStyles', () => {
		it( 'returns an empty object if the height and width attributes are undefined', () => {
			const attributes = {};
			expect( getTableStyles( attributes ) ).toEqual( {} );
		} );

		it( 'returns a width value by concatenating the width and widthUnit attributes', () => {
			const attributes = {
				width: 52,
				widthUnit: 'anythings',
			};
			expect( getTableStyles( attributes ).width ).toBe( '52anythings' );
		} );

		it( 'returns a height style by appending px to the end of the height attribute', () => {
			const attributes = {
				height: 40,
			};
			expect( getTableStyles( attributes ).height ).toBe( '40px' );
		} );

		it( 'returns a height or width of zero if the attributes are negative', () => {
			const attributes = {
				width: -20,
				widthUnit: 'px',
				height: -10,
			};
			expect( getTableStyles( attributes ) ).toEqual( {
				width: '0px',
				height: '0px',
			} );
		} );
	} );
} );
