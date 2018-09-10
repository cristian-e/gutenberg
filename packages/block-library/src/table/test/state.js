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
	getWidthStyle,
	getHeightStyle,
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
} );

describe( 'getWidthStyle', () => {
	it( 'returns an object with a width property calculated by appending the widthUnit to the width', () => {
		const attributes = {
			width: 52,
			widthUnit: 'anythings',
		};
		expect( getWidthStyle( attributes ).width ).toBe( '52anythings' );
	} );

	it( 'returns an object with a width property that has a minimum value of 0', () => {
		const attributes = {
			width: -5,
			widthUnit: 'foos',
		};
		expect( getWidthStyle( attributes ).width ).toBe( '0foos' );
	} );

	it( 'returns undefined if the width is not set', () => {
		const attributes = {
			width: undefined,
			widthUnit: 'anythings',
		};
		expect( getWidthStyle( attributes ) ).toBeUndefined();
	} );
} );

describe( 'getHeightStyle', () => {
	it( 'returns an object with a height property calculated by appending px to the height attribute', () => {
		const attributes = {
			height: 13,
		};
		expect( getHeightStyle( attributes ).height ).toBe( '13px' );
	} );

	it( 'returns an object with a height property that has a minimum value of 0', () => {
		const attributes = {
			height: -5,
		};
		expect( getHeightStyle( attributes ).height ).toBe( '0px' );
	} );

	it( 'returns undefined if the height is not set', () => {
		const attributes = {
			height: undefined,
		};
		expect( getHeightStyle( attributes ) ).toBeUndefined();
	} );
} );

describe( 'getTableStyles', () => {
	it( 'returns undefined if the height and width attributes are undefined', () => {
		const attributes = {};
		expect( getTableStyles( attributes ) ).toBeUndefined();
	} );

	it( 'returns the width as determined by #getWidthStyle', () => {
		const attributes = {
			width: 10,
			widthUnit: 'bananas',
			height: 200,
		};
		const expectedWidthStyles = getWidthStyle( attributes );
		expect( getTableStyles( attributes ) ).toMatchObject( expectedWidthStyles );
	} );

	it( 'returns the height as determined by #getHeightStyle', () => {
		const attributes = {
			width: 10,
			widthUnit: 'bananas',
			height: 200,
		};
		const expectedHeightStyles = getHeightStyle( attributes );
		expect( getTableStyles( attributes ) ).toMatchObject( expectedHeightStyles );
	} );
} );
